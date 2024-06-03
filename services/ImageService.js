import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: '../config/config.env' });

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const configureCloudinary = () => {
	cloudinary.config({
		cloud_name: CLOUDINARY_CLOUD_NAME,
		api_key: CLOUDINARY_API_KEY,
		api_secret: CLOUDINARY_API_SECRET,
	});
};

export const uploadImage = async (imagePath, publicId) => {
	const uploadResult = await cloudinary.uploader
		.upload(imagePath, {
			public_id: publicId,
		})
		.catch((error) => {
			console.log(error);
		});

	return uploadResult;
};

export const optimizeUrl = async (publicId) => {
	const optimizeUrl = cloudinary.url(publicId, {
		fetch_format: 'auto',
		quality: 'auto',
	});

	return optimizeUrl;
};

export const autoCropUrl = async (
	publicId,
	crop = 'auto',
	gravity = 'auto',
	width = 500,
	height = 500
) => {
	const autoCropUrl = cloudinary.url(publicId, {
		crop: crop,
		gravity: gravity,
		width: width,
		height: height,
	});

	return autoCropUrl;
};

export const getImageByPublicId = async (publicId, options = {}) => {
	const image = await cloudinary.api
		.resource(publicId, options)
		.then((resp) => resp)
		.catch((error) => {
			console.log(error);
		});

	return image;
};
