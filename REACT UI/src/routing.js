
import {
    createBrowserRouter,
  } from "react-router-dom";

  import Addcategory from './components/Addcategory';
  import Addproduct from './components/Addproduct';
  import Showcategory from './components/Showcategory';
  import Showproduct from './components/Showproduct';
  import Home from './components/Home';
import App from "./components/App";
import Deletecategory from "./components/Deletecategory";
import Deleteproduct from "./components/Deleteproduct";
import EditCategoryForm from "./components/EditCategoryForm";
import Editproduct from "./components/Editproduct";
import Footer from "./components/Footer";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
            path: "/",
            element: <Home />
          },

          {
            path: "/",
            element: <Footer />
          },
        {
            path: "/add-category",
            element: <Addcategory />
          },
          {
            path: "/add-product",
            element: <Addproduct />
          },
          {
            path: "/show-category",
            element: <Showcategory />
          },
        
          {
            path: "/show-product",
            element: <Showproduct />
          },
          {
            path:"/delete-cat/:id",
            element:<Deletecategory />
          },
          {
            path:"/delete-pro/:id",
            element:<Deleteproduct/>
          },
          {
            path:'/edit-cat/:id',
            element:<EditCategoryForm />
          },
          {
            path:'/edit-pro/:id',
            element:<Editproduct />
          }
      ]
    }
    
  ]);

  export default router;