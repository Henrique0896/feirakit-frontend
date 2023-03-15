import apiFeiraKit from './ApiFeiraKit';

export class Product {
   async getAllProducts (page,limit,sort){
        return(
           await apiFeiraKit
           .get(`products?page=${page}&limit=${limit}&sort=${sort}`)
        )
    }

    async getProductsByName(name){
        return(
            await apiFeiraKit
            .get(`/products/byname/${name}`)
         )
    }

    async getProductsByIdUsuario(id){
        return(
            await apiFeiraKit
            .get(`/products/by-id-usuario/${id}`)
         )
    }

    async createProduct(product){
        return(
            await apiFeiraKit
            .post("/products", product)
        )
    }
    
    async updateProduct(product){
        return(
            await apiFeiraKit
            .put("/products", product)
        )
    }

    async getUnites(){
     return(await apiFeiraKit
     .get(`/products/units`))
    }

    async deleteProduct(product){
        return(await apiFeiraKit
        .delete("/products", {data:product}))
    }

}
