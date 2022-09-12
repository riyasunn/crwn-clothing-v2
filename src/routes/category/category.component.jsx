import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';
import { Title, CategoryContainer } from './category.styles';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';


const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    // const { categoriesMap } = useContext(CategoriesContext);
    // const products = categoriesMap[category];
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category]);

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {isLoading ? (
                <Spinner />
            ) : (
                <CategoryContainer>
                    {products &&
                    products.map((product) => (<ProductCard key={product.id} product={product}/> ))  
                    }
                </CategoryContainer>
            )}
            
        </Fragment>
    )
}

export default Category;