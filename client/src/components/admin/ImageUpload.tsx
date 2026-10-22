import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

interface ProductImageUploadProps {
  images: Array<{
    url: string;
    file?: File;
    public_alt?: string;
  }>;
  onChange: (
    images: Array<{ url: string; file?: File; public_alt?: string }>,
  ) => void;
}

function ImageUpload({ images, onChange }: ProductImageUploadProps) {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = await Promise.all(
      files.map(async (file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    );

    onChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];

    if (images[index]?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(images[index].url);
    }

    newImages.splice(index, 1);
    onChange(newImages);
  };
  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <div className="relative group" key={index}>
            <img
              src={image.url}
              alt={`Preview ${index + 1}`}
              className={`w-full h-32 object-cover rounded-lg ${image.file && "border-4 border-blue-300"}`}
            />
            <Button
              type="button"
              onClick={() => removeImage(index)}
              className={
                "absolute top-2 right-2 px-2 py-4 hover:bg-red-600 transition "
              }
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant={"outline"}
        onClick={() => document.getElementById("image-upload")?.click()}
      >
        Add Image
      </Button>
      <input
        id="image-upload"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default ImageUpload;
