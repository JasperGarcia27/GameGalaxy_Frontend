// import { useState, useEffect } from 'react';

// import {
//     Row,
//     Col,
//     Card,
//     Dropdown,
//     NavDropdown,
//     Collapse,
//     Table,
//     Container,
//     Modal,
//     Button
// } from 'react-bootstrap';

// import { Link } from 'react-router-dom';

// import { AiOutlineShoppingCart } from "react-icons/ai";
// import Badge from '@mui/material/Badge';

// // Components
// import Banner from '../components/Banner'

// function Cart() {

//     const values = [true];
//     const [fullscreen, setFullscreen] = useState(true);
//     const [show, setShow] = useState(false);

//     const [cart, setCart] = useState([]);
//     const [cartNotif, setCartNotif] = useState(0);
//     const [productData, setProductData] = useState([]);
//     const [bill, setBill] = useState(0);
//     const [isEmpty, setIsEmpty] = useState(true);


//     function handleShow(breakpoint) {
//         setFullscreen(breakpoint);
//         setShow(true);
//     }

//     useEffect(() => {
//         fetch(`https://gamegalaxy-backend.onrender.com/cart/viewcart`, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//                 console.log(data.length)
//                 // console.log(data[0].products.length)
//                 // console.log(data[0].bill)

//                 // setCartNotif(data[0].products.length)
//                 setProductData(data);
//                 if (data.length !== 0) {
//                     setBill(data[0].bill)
//                     setCartNotif(data[0].products.length)
//                 }

//                 if (data.length !== 0) {
//                     const myCart = data[0].products.map((item, index) => (
//                         <tr key={index}>
//                             <td valign='middle' width='40%' className='text-center'>
//                                 <img src={item.image} alt={item.name} style={{ maxWidth: '100%' }} />
//                             </td>
//                             <td valign='middle' width='60%'>
//                                 <Container>
//                                     <Row>
//                                         <h6>{item.name}</h6>
//                                     </Row>
//                                     <Row className='text-success'>
//                                         <h5>₱{item.price.toLocaleString("en-US")}</h5>
//                                     </Row>
//                                     <Row>
//                                         <p className='text-muted'>x{item.quantity}</p>
//                                     </Row>
//                                 </Container>
//                             </td>
//                         </tr>
//                     ))

//                     setCart(myCart.reverse())
//                 }
//             })
//     }, [])

//     useEffect(() => {

//         if (productData.length !== 0) {
//             setIsEmpty(true);
//         } else {
//             setIsEmpty(false);
//         }

//     }, [productData]);

//     console.log(productData.length)


//     return (
//         <>

//             <Link className='text-dark text-center m-2' onClick={() => setShow(true)} >
//                 <Badge badgeContent={cartNotif} color="error">
//                     <AiOutlineShoppingCart size={25} color="action" />
//                 </Badge>
//             </Link>
//             <Modal
//                 scrollable
//                 size="md"
//                 show={show}
//                 onHide={() => setShow(false)}
//                 aria-labelledby="example-modal-sizes-title-lg"
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title id="example-modal-sizes-title-lg">
//                         CART
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {
//                         isEmpty
//                             ?
//                             <Table responsive>
//                                 <tbody className='text-start'>
//                                     {cart}
//                                 </tbody>
//                             </Table>
//                             :
//                             <Row>
//                                 <Col className="p-5 text-center">
//                                     <h1 className='BrandTitle'>Empty Cart</h1>
//                                     <p className='BannerContent'>Your cart is empty</p>
//                                 </Col>
//                             </Row>
//                     }
//                 </Modal.Body>
//                 <Modal.Footer>
//                     {/* <Button
//                         variant="primary"
//                         block
//                         onClick={() => getOrder(productId)}>Checkout</Button> */}
//                     <h5 className='text-danger ms-2 me-1 ms-lg-4 me-lg-2'><strong>₱{bill.toLocaleString("en-US")}</strong></h5>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default Cart;