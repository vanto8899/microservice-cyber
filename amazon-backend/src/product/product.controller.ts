import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
    private elasticService: ElasticsearchService
  ) {}

  @Get("/elastic")
  async getElastic(@Query("name") nameProduct) {
    this.elasticService.cat.indices()
    // await this.elasticService.update({
    //   index: "demo_index",
    //   id: "ma_1",

    //   doc: {
    //     name: "demo 11"
    //   },
    //   refresh: true // làm mới lại index
    // })

    // await this.elasticService.delete({
    //   index: "demo_index",
    //   id: "atnXUZIBstd7JCmwpizo",
    //   refresh: true
    // })

    let data = await this.elasticService.search({
      index: "demo_index",
      query: {
        match: {
          "name": nameProduct
        }
      }
    })

    return data
  }

  @Get("/save")
  luuCache() {
    return this.productService.getProduct(0)
  }

  @Get("/remove")
  xoaCache() {
    return this.productService.getProduct(1)
  }

  @Get("/update")
  updateProduct() {
    return this.productService.updateProduct()
  }

  @Get("/get-all")
  getProduct() {
    return this.productService.getProduct(2)
  }

  @Get("/get-category")
  getCategory() {
    return this.productService.getCategory()
  }

  @Get("/get-product-type/:categoryId")
  getProductType(@Param("categoryId") categoryId) {
    return this.productService.getProductType(categoryId)
  }

  @Get("/search-pagination")
  getSearch(@Query("name") name, @Query("page") page) {

    return this.productService.getSearch(name, page)
  }

  @Get("/get-product-detail/:id")
  getProductDetail(@Param("id") id) {

    return this.productService.getProductDetail(id)
  }

}

