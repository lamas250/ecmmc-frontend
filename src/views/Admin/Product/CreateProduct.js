import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../redux/actions/productActions';



export default function CreateProduct(props) {
    const [form, setForm ] = useState({name:'', category: '', price: '', countInStock: '', brand: '', description: ''});

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProduct(form));
        props.history.push('/admin/products')
    }

    return (
        <div>
            <div>
                <h1>Create Product</h1>
                <form 
                    className="form" 
                    onSubmit={submitHandler}
                >
                    <div>
                        <label htmlFor="name">Name</label>
                        <input name={"name"} type="text" 
                            placeholder="Enter name"
                            value={form.name}
                            onChange={inputHandler}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select name={"category"} type="text" 
                            value={form.category}
                            onChange={inputHandler}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="Tec">Tec</option>
                            <option value="Hardware">Hardware</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input name={"price"} type="text" 
                            placeholder="Enter price"
                            value={form.price}
                            onChange={inputHandler}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="stock">In stok</label>
                        <input name={"countInStock"} type="text" 
                            placeholder="Enter stock"
                            value={form.countInStock}
                            onChange={inputHandler}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input name={"brand"} type="text" 
                            placeholder="Enter brand"
                            value={form.brand}
                            onChange={inputHandler}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input name={"description"} type="text" 
                            placeholder="Enter description"
                            value={form.description}
                            onChange={inputHandler}
                        ></input>
                    </div>
                    <div>
                        <label></label>
                        <button type="submit" className="primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
