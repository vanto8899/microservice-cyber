import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cache } from 'cache-manager'

@Injectable()
export class ProductService {

    constructor(
        private prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async updateProduct() {
        
        this.cacheManager.del("product_cache")
        
        await this.prismaService.product.update({
            data: {
                "product_id": 2,
                "product_name": "samsung promax",
                "attributes": [
                    {
                        "color": "red",
                        "image": "image1_1.jpg",
                        "price": 100
                    },
                    {
                        "color": "blue",
                        "image": "image1_2.jpg",
                        "price": 110
                    }
                ],
                "user_id": 1,
                "rate": "4.5",
                "star": 5,
                "description": "Description of product 1",
                "category_id": 1,
                "create_at": "2024-09-24T11:30:13.776Z",
                "is_remove": false
            },
            where: {
                product_id: 2
            }
        })
    }


    async getProduct(id) {

        if (id == 1) {
            this.cacheManager.reset()
            return
        }

        // install bảng 5.7.0
        // 1 - hết TTL
        // 2 - cập nhật cache
        // 3 - xóa hết cache, xóa cache
        let dataCache = await this.cacheManager.get("product_cache")
        console.log("kiểm tra cache")
        if (dataCache) {
            console.log("trả cache")

            return dataCache
        }

        let data = await this.prismaService.product.findMany({
            take: 10
        })
        console.log("lưu cache")

        this.cacheManager.set("product_cache", data)
        return data;
    }


    async getProductDetail(id) {

        let data = await this.prismaService.product.findFirst({
            where: {
                product_id: Number(id)
            }
        })
        return data;
    }

    async getCategory() {

        let data = await this.prismaService.category.findMany()
        return data;
    }

    async getProductType(categoryId) {

        let data = await this.prismaService.product.findMany({
            where: {
                category_id: categoryId
            }
        })
        return data;
    }

    async getSearch(name, page) {

        let index = (page - 1) * 5;

        let data = await this.prismaService.product.findMany({
            where: {
                product_name: {
                    contains: name
                }
            },
            skip: index,
            take: 5
        })
        return data;
    }


}