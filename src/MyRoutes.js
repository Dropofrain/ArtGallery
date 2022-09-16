import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from './components/pages/Cart'
import Home from './components/pages/Home'
import Productspage from './components/pages/Productspage'
import Signin from './components/pages/Signin'
import Signup from './components/pages/Signup'
//import Blogs from './components/pages/Blogs'
//import AdmineRoute from '../../route/AdminRoute'
import ViewCategories from './components/pages/viewCategories'
import AdmineRoute from './route/AdminRoute'
import AddCategory from './components/pages/AddCategory'
import ConfirmUser from './components/pages/ConfirmUser'
import HomePage from './components/pages/HomePage'
import Services from './components/pages/Services'
import AdminDashboard from './components/pages/AdminDashboard'
import PrivateRoute from './route/PrivateRoute'
import EditCategory from './components/pages/EditCategory'
import Contact from './components/pages/Contact'
import ProductsAdmin from './components/pages/ProductsAdmin'
import AddProduct from './components/pages/AddProduct'
import ProductsDetails from './components/pages/ProductsDetails'
import ConfirmOrder from './components/pages/ConfirmOrder'
import Shipping from './components/pages/Shipping'
import PaymentElement from './components/pages/PaymentElement'
import UserProfile from './components/pages/UserProfile'
import UserOrderDetail from './components/pages/UserOrderDetail'
import Forgetpassword from './components/pages/Forgetpassword'
import ResetPassword from './components/pages/ResetPassword'
import Payment from './components/pages/Payment'
import UserDashboard from'./components/pages/UserDashboard'
import Users from './components/pages/Users'
import UserProducts from './components/pages/UserProducts'
import UpdateProduct from './components/pages/UpdateProduct'
import DeleteProduct from './components/pages/DeleteProduct'
import Search from './components/pages/Search'
import UserOrders from './components/pages/UserOrders'
import OrderDetails from './components/pages/OrderDetails'


const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/confirmuser/:token' element={<ConfirmUser />} />
        <Route path='/forgetpassword' element={<Forgetpassword/>}/>
        <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
        <Route path='/search' element={<Search/>}/>

        {/* material pages */}

        <Route path='/home' element={<HomePage />} />
        <Route path='/products' element={<Productspage />} />
        <Route path='/services' element={<Services />} />
        {/* <Route path='/blogs' element={<Blogs />} /> */}
        <Route path='/contact' element={<Contact />} />

        <Route path='/product/:id' element={<ProductsDetails />} />
        <Route path='/confirm' element={<ConfirmOrder />} />
        <Route path='/product/update/:id' element = {<UpdateProduct/>}/>
          <Route path='/product/delete/:id' element ={<DeleteProduct/>}/>

        <Route path='/' element={<AdmineRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/categories' element={<ViewCategories />} />
          <Route path='/category/add' element={<AddCategory />} />
          <Route path='/category/update/:category_id' element={<EditCategory />} />
          <Route path='/admin/products' element={<ProductsAdmin />} />
          <Route path='/admin/product/add' element={<AddProduct />} />
          
        </Route>

        {/* <Route path='/paymentformtest' element={<PaymentForm />} /> */}

        <Route path='/' element={<PrivateRoute />}>
          <Route path='/user/cart' element={<Cart />} />
          <Route path='/confirmorder' element={<ConfirmOrder />} />
          <Route path='/Shipping' element={<Shipping />} />
          {/* <Route path='/Payment' element={<Payment/>}/> */}
          <Route path='/payment' element={<PaymentElement />} />
          <Route path='/user/profile' element={<UserDashboard />} />
          <Route path='/orderdetails/:order_id' element={<UserOrderDetail/>} />
          <Route path='/users/view' element={<Users/>}/>
          <Route path='/product/add' element={<AddProduct />} />
          <Route path='/product' element={<UserProducts/>}/>
          <Route path='/user/order' element={<UserOrders/>}/>
          <Route path='/user/order/:order_id' element={<OrderDetails/>}/>
          
          

          {/* <Route path='/' */}

        </Route>

      </Routes>
    </Router>
  )
}

export default MyRoutes