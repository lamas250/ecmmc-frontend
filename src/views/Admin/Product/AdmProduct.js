import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { deleteProduct, listProducts } from '../../../redux/actions/productActions';

export default function AdmProduct() {
    const productList = useSelector(state => state.productList);
    const { loading, error , products} = productList;
   
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
    },[dispatch])

    const actionHandler = (action, id) => {
        if(action === "edit"){
            console.log("edit",id)
        }else{
            dispatch(deleteProduct(id));
        }
    }

    return (
        <div>
            {
                loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                (<>
                    <div className="row">
                        <h1>Products</h1>
                        <Link to="/admin/products/create">
                            <button className="alert-success">Create</button>
                        </Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IMG</th>
                                <th>NAME</th>
                                <th>BRAND</th>
                                <th>IN STOCK</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p._id}>
                                    <td>{p.image}</td>
                                    <td>{p.name}</td>
                                    <td>{p.brand}</td>
                                    <td>{p.countInStock}</td>
                                    <td>
                                        <button 
                                            className="alert-info"
                                            onClick={() => actionHandler("edit", p._id)}
                                        >Editar</button>
                                        <button 
                                            className="alert-danger"
                                            onClick={() => actionHandler("delete", p._id)}
                                        >Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>)
            }
        </div>
    )
}
