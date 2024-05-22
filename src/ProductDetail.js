import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from "react-query";
import axios from 'axios';

const ProductDetail = ({ product }) => {
    if (!product) {
        return null
    }
    return (
        <div>
            <h4>Thông tin chi tiết sản phẩm:</h4>
            <p>Title: {product.title}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Brand: {product.brand}</p>
            <img src={product.thumbnail} alt="Product" />
        </div>
    );
}

export default ProductDetail;