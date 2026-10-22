import { Request, Response } from "express";
import aysncHandler from "../utils/asyncHandler";
import { Product } from "../models/productSchema";
import { AuthRequest } from "../middlewares/authMiddleware";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary";

//@route method - POST | path - api/product
//@desc create new Product
//@access private/admin

export const createProduct = aysncHandler(
  async (req: AuthRequest, res: Response) => {
    // const {
    //   name,
    //   description,
    //   price,
    //   category,
    //   instock_count,
    //   images,
    //   color,
    //   sizes,
    //   is_new_arrival,
    //   is_feature,
    //   rating_count,
    // } = req.body;

    const { name, description, category } = req.body;

    const sizes = Array.isArray(req.body.sizes)
      ? req.body.sizes
      : [req.body.sizes];
    const color = Array.isArray(req.body.color)
      ? req.body.color
      : [req.body.color];

    const price = Number(req.body.price);
    const instock_count = Number(req.body.instock_count);
    const rating_count = Number(req.body.rating_count);

    const is_feature = req.body.is_feature === "true";
    const is_new_arrival = req.body.is_new_arrival === "true";

    const images = req.files as Express.Multer.File[];

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const uploadImg = await uploadSingleImage(
          `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
          "auara.com/product",
        );
        return {
          url: uploadImg.image_url,
          public_alt: uploadImg.public_alt,
        };
      }),
    );

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      instock_count,
      images: uploadedImages,
      color,
      sizes,
      is_new_arrival,
      is_feature,
      rating_count,
      userId: req.user?._id!,
    });

    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(404);
      throw new Error("Product Creation Failed");
    }
  },
);

//@route method - PUT | path - api/product/:id
//@desc update Product
//@access private/admin

export const UpdateProduct = aysncHandler(
  async (req: Request, res: Response) => {
    const { name, description, category, existingImages } = req.body;

    const { id } = req.params;

    const sizes = Array.isArray(req.body.sizes)
      ? req.body.sizes
      : [req.body.sizes];
    const color = Array.isArray(req.body.color)
      ? req.body.color
      : [req.body.color];

    const price = Number(req.body.price);
    const instock_count = Number(req.body.instock_count);
    const rating_count = Number(req.body.rating_count);

    const is_feature = req.body.is_feature === "true";
    const is_new_arrival = req.body.is_new_arrival === "true";

    //parse existing images
    const keepExistingImage = existingImages ? JSON.parse(existingImages) : [];

    //new image upload
    const newImages = req.files as Express.Multer.File[];

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      res.status(404);
      throw new Error("Product Not Found with this ID.");
    }

    //images to delete

    const imagesToDelete = existingProduct.images.filter((existingImg) => {
      return !keepExistingImage.some(
        (keepImg: any) => keepImg.public_alt === existingImg.public_alt,
      );
    });

    if (imagesToDelete.length > 0) {
      await Promise.all(
        imagesToDelete.map(async (img) => {
          if (img.public_alt) {
            try {
              await deleteImage(img.public_alt);
            } catch (error) {
              console.log(`Failed to delete image${img.public_alt}`, error);
            }
          }
        }),
      );
    }

    let uploadedNewImages: any[] = [];
    if (newImages && newImages.length > 0) {
      uploadedNewImages = await Promise.all(
        newImages.map(async (newImg) => {
          const uploadImg = await uploadSingleImage(
            `data:${newImg.mimetype};base64,${newImg.buffer.toString("base64")}`,
            "auara.com/product",
          );
          return {
            url: uploadImg.image_url,
            public_alt: uploadImg.public_alt,
          };
        }),
      );
    }

    const finalImages = [...keepExistingImage, ...uploadedNewImages];

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;
    existingProduct.category = category || existingProduct.category;
    existingProduct.instock_count =
      instock_count || existingProduct.instock_count;
    existingProduct.images = finalImages;
    existingProduct.color = color || existingProduct.color;
    existingProduct.sizes = sizes || existingProduct.sizes;
    existingProduct.is_new_arrival =
      is_new_arrival || existingProduct.is_new_arrival;
    existingProduct.is_feature = is_feature || existingProduct.is_feature;
    existingProduct.rating_count = rating_count || existingProduct.rating_count;

    const updatedProduct = await existingProduct.save();

    res.status(200).json(updatedProduct);
  },
);

//@route method - DELETE | path - api/product/delete
//@desc delete Product
//@access private/admin

export const DeleteProduct = aysncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const existingProduct = Product.findById(id);

    if (!existingProduct) {
      res.status(401).json({ message: "No product found with this ID" });
    }

    await existingProduct.deleteOne();

    res.status(200).json({ message: "Product deleted" });
  },
);

//@route method - GET | path - api/product
//@desc find product
//@access public

export const getProductWithFilter = aysncHandler(
  async (req: Request, res: Response) => {
    const { keyword, size, color, minPrice, maxPrice, category, sortBy } =
      req.query;

    let query: any = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (size) {
      const sizes = Array.isArray(size) ? size : [size];
      query.sizes = { $in: sizes };
    }

    if (color) {
      const colors = Array.isArray(color) ? color : [color];
      query.color = { $in: colors };
    }

    //sorting

    let sortOptions: any = {};
    if (sortBy === "price_asc") sortOptions.price = 1;
    if (sortBy === "price_desc") sortOptions.price = -1;
    if (sortBy === "latest") sortOptions.createdAt = -1;
    if (sortBy === "rating") sortOptions.rating_count = -1;

    const search = await Product.find(query).sort(sortOptions);
    res.status(200).json(search);
  },
);

//@route method - GET | path - api/product/new
//@desc find new product
//@access public

export const getNewArrivalProduct = aysncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.find({ is_new_arrival: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(product);
  },
);

//@route method - GET | path - api/product/isfeatured
//@desc find featured product
//@access public

export const getFeaturedProduct = aysncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.find({ is_feature: true });
    res.status(200).json(product);
  },
);

//@route method - GET | path - api/product/:id
//@desc find product by id
//@access public

export const getproductById = aysncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found!");
    }
    res.status(200).json(product);
  },
);

//@route method - GET | path - api/product/meta
//@desc get product metadata
//@access public

export const getProductMetaData = aysncHandler(async (req, res) => {
  const color = await Product.distinct("color");
  const size = await Product.distinct("sizes");

  const priceRange = await Product.aggregate([
    {
      $group: {
        _id: null,
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);

  res.status(200).json({
    color,
    size,
    minPrice: priceRange[0]?.minPrice || 0,
    maxPrice: priceRange[0]?.maxPrice || 0,
  });
});
