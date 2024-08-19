

import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

// Utility function to upload a file to Cloudinary
export const uploadToCloudinary = async (file, preset = 'your_upload_preset') => {
  const cloudinary = new Cloudinary({ cloud: { cloudName: 'dcek0dpez' } });

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/dcek0dpez/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    // Here you could apply transformations if needed
    const img = cloudinary.image(data.public_id)
      .format('auto')
      .quality('auto')
      .resize(auto().gravity(autoGravity()).width(500).height(500));

    return {
      secureUrl: data.secure_url,
      publicId: data.public_id,
      cldImg: img, // transformed image object
      ...data // other metadata
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};



