export interface products_filesEntity {
    directus_files_id?: string | null;
    id?: number;
    products_id?: number | null;
}



export interface CategoriesInterface  {
    date_created?: Date | null;
    date_updated?: Date | null;
    id?: number;
    name?: string;
    status?: string;
    user_created?: string | null;
    user_updated?: string | null;
}


export interface ProductsInterface {
    amount?: number | null;
    category?: number | null;
    date_created?: Date | null;
    date_updated?: Date | null;
    description?: Object | null;
    id?: number;
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
    images: Array<products_filesEntity>
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
    items: Array<ProductsInterface>
  }