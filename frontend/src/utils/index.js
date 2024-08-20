import { Cloudinary } from '@cloudinary/url-gen';
import axios from 'axios';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';



// Initialize Cloudinary instance
const cloudinary = new Cloudinary({ cloud: { cloudName: 'dcek0dpez' } });

// Utility function to upload a file to Cloudinary with transformation
export const uploadToCloudinary = async (file, preset, onProgress = () => {}) => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dcek0dpez/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);
  formData.append('folder', 'chats'); // Specify the folder here

  try {
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
        console.log('progress: ' + percentCompleted);
      },
    });

    const data = response.data;
    console.log('Cloudinary response:', data); // Log the entire response

    if (!data.secure_url || !data.public_id) {
      console.warn('Upload did not return secure_url or public_id');
    } else {
      console.log('secure_url:', data.secure_url);
      console.log('public_id:', data.public_id);
    }

    // Handle image and non-image files differently
    let transformedUrl = data.secure_url;
    if (file.type.startsWith('image/')) {
      const img = cloudinary.image(data.public_id)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500));
      transformedUrl = img.toURL();
    }

    return {
      secureUrl: data.secure_url,
      publicId: data.public_id,
      mimeType: file.type, // Add the MIME type to the response
      cldImg: transformedUrl, // Get the transformed image URL or the original URL
      ...data // Other metadata
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
