export interface ProductsFilesInterface {
    id: number;
    directus_files_id?: string | null;
    products_id?: string | null;
}



export interface CategoriesInterface  {
    id: string;
    date_created?: Date | null;
    date_updated?: Date | null;
    
    name?: string;
    status?: string;
    user_created?: string | null;
    user_updated?: string | null;
}


export interface ProductsInterface {
    id: string;
    amount?: number | null;
    category?: number | null;
    date_created?: Date | null;
    date_updated?: Date | null;
    description?: Object | null;
    image?: string | null;
    name?: string | null;
    price?: number | null;
    short?: string | null;
    sku?: string | null;
    slug?: string | null;
    sort?: number | null;
    status?: string;
    technical_data?: Object | null;
    user_created?: string | null;
    user_updated?: string | null;
    categorie: CategoriesInterface
    images: Array<ProductsFilesInterface>
}
  

export interface OrderInterface {
    id: string;
    is_anonymous?: boolean | null;
    link?: string | null;
    link_expires_at?: Date | null;
    sort?: number | null;
    status?: string | null;
    user?: string | null;
    line1?: string | null;
    line2?: string | null;
    name?: string | null;
    email?: string | null;
    city?: string | null;
    country?: string | null;
    phone?: string | null;
    postal_code?: string | null;
    user_created?: string | null;
    user_updated?: string | null;
    date_created?: Date | null;
    date_updated?: Date | null;
    items: Array<ProductsOrdersInterface>
  }


export interface ProductsOrdersInterface {
    id: number;
    order_id?: string | null | OrderInterface;
    products_id?: string | null | ProductsInterface;
}
