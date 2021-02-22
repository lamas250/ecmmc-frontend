import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../../../redux/actions/productActions';

export default function EditProduct() {

    const productDetails = useSelector(state => state.productDetails);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsProduct());
    }, [dispatch])

    return (
        <div>
            {console.log(productDetails)};
        </div>
    )
}
