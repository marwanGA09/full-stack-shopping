import { Form, redirect } from 'react-router-dom';
import axios from 'axios';
import myURL from './URL/url';

function AddProduct() {
  return (
    <div className="productInput">
      <Form method="POST">
        <label htmlFor="category">category</label>
        <div>
          <label>
            <input type="radio" value="cloth" name="category" />
            <span>Clothes</span>
          </label>
          <label>
            <input type="radio" value="electronics" name="category" />
            <span>Electronics</span>
          </label>
          <label>
            <input type="radio" value="jewelry" name="category" />
            <span>Jewelry</span>
          </label>
        </div>
        <label htmlFor="title">Title of Product</label>
        <input type="text" name="title" />
        <label htmlFor="price">price of Product</label>
        <input type="number" name="price" />
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description"></textarea>
        <label htmlFor="image">image URL</label>
        <input type="url" name="image" />
        <label htmlFor="rating">count</label>
        <input type="number" name="rating" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const content = {
    ...data,
    id: crypto.randomUUID(),
    rating: { count: data.rating },
  };

  console.log('formData', data);
  console.log('content', content);
  axios
    .post(`${myURL}/addProduct`, content, { contentType: 'application/json' })
    .then((res) => console.log('post res', res))
    .catch((err) => console.log('err', err));

  return redirect('/shopping');
}

export default AddProduct;
