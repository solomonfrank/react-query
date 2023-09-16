import "./App.css";
import { useGetProduct } from "./api/getProduct";
import { FetchError } from "./lib/fetchJson";
import { useInput } from "./hook/useInput";
import { useCreateProduct } from "./api/createProduct";

function App() {
  const { onChange, values } = useInput({
    title: "",
    description: "",
    price: "",
    brand: "",
  });

  const productQuery = useGetProduct({});
  const createProductMutation = useCreateProduct();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createProductMutation.mutateAsync(values);
  };

  if (productQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productQuery.isSuccess && !productQuery.data?.length) {
    return <div>No Data</div>;
  }

  if (productQuery.isError) {
    return <div>{errorMessage(productQuery?.error)}</div>;
  }

  return (
    <section className="container">
      <div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="input-field">
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  type="text"
                  id="title"
                  value={values.title}
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="description">Description</label>
                <input
                  name="description"
                  type="text"
                  id="description"
                  value={values.description}
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="price">Price</label>
                <input
                  name="price"
                  type="text"
                  id="prices"
                  value={values.price}
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="brand">Brand</label>
                <input
                  name="brand"
                  type="text"
                  id="brand"
                  value={values.brand}
                  onChange={onChange}
                />
              </div>
              <div className="submitWrap">
                <button type="submit">
                  {createProductMutation.isLoading ? "Submitting" : "Add post"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="product-list">
          {productQuery.data.map((item) => (
            <div className="product-list-item" key={item.id}>
              <img src={item.thumbnail} />
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const errorMessage = (error: Error) => {
  if (error instanceof FetchError) {
    return `${error.statusCode} : ${error.message} `;
  }
  return error.message;
};

export default App;
