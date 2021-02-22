import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { listProducts } from '../../../redux/actions/productActions';

export default function AdmProduct() {
    const productList = useSelector(state => state.productList);
    const { loading, error , products} = productList;
   
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
    },[dispatch])

    const editHandler = (id) => {
        console.log(id)
    }

    return (
        <div>
            {
                loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                (<>
                    <h1>Products</h1>
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
                                            onClick={() => editHandler(p._id)}
                                        >Editar</button>
                                        <button className="alert-danger">Excluir</button>
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
