// CATEGORY
const Category = require('../models/categoryModel')

const categoryController = {
	// lấy danh mục
	// [GET] /api/category/
	getCategories: async (req, res) => {
		try {
			const categories = await Category.find()
			if (!categories)
				return res
					.status(404)
					.json({ status: 'Fail', message: 'Có lỗi xảy ra!' })
			return res.status(200).json({ status: 'Success', data: categories })
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},

	// Tạo mới danh mục
	// [POST] /api/category
	createCategory: async (req, res) => {
		try {
			const { name, image, slug } = req.body

			const category = await Category.findOne({ name })

			if (category)
				return res
					.status(400)
					.json({ status: 'Fail', message: 'Danh mục đã tồn tại' })

			const newCategory = new Category({ name, image, slug })

			await newCategory.save()

			res
				.status(200)
				.json({ status: 'Success', message: 'Tạo danh mục thành công' })
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
	// chỉnh sửa danh mục
	// [PUT] /api/category/:id
	updateCategory: async (req, res) => {
		try {
			const id = req.params.id
			const { name, image, slug } = req.body
			const category = await Category.findOneAndUpdate(id, {
				name,
				image,
				slug,
			})
			if (!category)
				return res
					.status(400)
					.json({ status: 'Fail', message: 'Có lỗi xảy ra' })
			return res
				.status(200)
				.json({ status: 'Success', message: 'Cập nhật thành công' })
		} catch (error) {
			return res.status(500).json({ status: 'Fail', message: error.message })
		}
	},

	// xóa danh mục
	// [DELETE] /api/category/:id
	deleteCategory: async (req, res) => {
		try {
			const id = req.params.id
			const category = await Category.findByIdAndRemove(id)
			if (!category)
				return res
					.status(400)
					.json({ status: 'Fail', message: 'Có lỗi xảy ra' })
			return res
				.status(200)
				.json({ status: 'Success', message: 'Xóa thành công' })
		} catch (error) {
			return res.status(500).json({ status: 'Fail', message: error.message })
		}
	},

	restoreCategory: async (req, res) => {
		try {
			const _id = req.params.id
			const result = await Category.restore({ _id })
			if (!result)
				return res
					.status(400)
					.json({ status: 'Fail', message: 'Có lỗi xảy ra' })
			return res
				.status(200)
				.json({ status: 'Success', message: 'Khôi phục danh mục thành công' })
		} catch (error) {
			return res.status(500).json({ status: 'Fail', message: error.message })
		}
	},
}

module.exports = categoryController
