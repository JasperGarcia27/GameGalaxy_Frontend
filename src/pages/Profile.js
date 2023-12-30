import { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import UserContext from '../UserContext';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import UserIcon from '../pictures/icon.png';

import {
  Row,
  Col,
  Card,
  Dropdown,
  NavDropdown,
  Collapse,
  Table,
  Container
} from 'react-bootstrap';
import { Divider, Chip } from '@mui/material';

import { IoSettingsSharp } from 'react-icons/io5';

// Events
import ResetPassword from '../events/ResetPassword';
import UpdateProfile from '../events/UpdateProfile';

// Components
import AppNavbar from '../components/AppNavBar';

import Navbar from '../components/NavBar'

export default function Profile() {

  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});


  const [productDetails, setProductDetails] = useState([])


  const [orderHistory, setOrderHistory] = useState([]);
  const [bill, setBill] = useState({});
  const [purchasedOn, setPurchasedOn] = useState({});

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`https://gamegalaxy-backend.onrender.com/users/getUserDetails`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (typeof data._id !== "undefined") {
          setDetails(data)
        }
      })
  }, [])

  useEffect(() => {
    fetch(`https://gamegalaxy-backend.onrender.com/orders/orderHistory`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.length)
        console.log(data)

        const setArray = []

        const detailsProducts = data.map(product => {

          return (
            <Container key={product._id}>
              <Row>
                <Col lg={2} className="d-flex justify-content-center align-items-center">
                  <img src={product.products[0].image} alt={product.products[0].productName} style={{ maxWidth: '150px' }} />
                </Col>
                <Col className="text-start d-flex align-items-center">
                  <Container className=''>
                    <Row>
                      <h4>{product.products[0].productName}</h4>
                    </Row>
                    <Row>
                      <h6 className='text-success'>₱{product.products[0].price.toLocaleString("en-US")}</h6>
                    </Row>
                    <Row>
                      <h6>x{product.products[0].quantity}</h6>
                    </Row>
                  </Container>
                </Col>
              </Row>
              <hr/>
            </Container>
          )
        })
        
        setArray.push(detailsProducts)
        setProductDetails(setArray)


        const orderedProducts = data.map(product => {
          console.log(product.products[0].productName)
          console.log(product.purchasedOn)
          const date = format(new Date(product.purchasedOn), "MMMM dd, yyyy");
          console.log(date)

          return (
            <tr key={product._id}>
              <td valign='middle' width='50%'>
                  <Col className='' lg={{span:10, offset:1}}>
                    {/* {productDetails} */}
                    <Container>
                      <Row>
                        <Col lg={2} className="d-flex justify-content-center align-items-center">
                          <img src={product.products[0].image} alt={product.products[0].productName} style={{ maxWidth: '150px' }} />
                        </Col>
                        <Col className="text-start ms-5 d-flex align-items-center">
                          <Container>
                            <Row>
                              <h4>{product.products[0].productName}</h4>
                            </Row>
                            <Row>
                              <h6 className='text-success'>₱{product.products[0].price.toLocaleString("en-US")}</h6>
                            </Row>
                            <Row>
                              <h6>x{product.products[0].quantity}</h6>
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                    <Divider textAlign="left"><strong>Total</strong></Divider>
                    <Container>
                      <Row>
                        <Col className='text-center' lg={3}>
                        <h5 className='text-danger'>₱{product.bill.toLocaleString("en-US")}</h5>
                        </Col>
                        <Col>
                          <p className='text-muted'>{date}</p>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
              </td>
            </tr>
          )
        })

        setOrderHistory(orderedProducts.reverse())


      })
  }, [])

  console.log(details.firstName)

  return (
    (user.access === null) ?
      <Navigate to="/products" />
      :
      <>
        <AppNavbar />
        <div className='mt-5' style={{ height: '100vh' }}>
          <Row>
            <Col lg={{ span: 8, offset: 2 }}>
              <div className="cardHighlight mx-2 mt-5 mb-1 bg-white rounded" >
                <Card.Body>
                  <Row className="mt-4 text-center">
                    <Col lg={{ span: 3, offset: 1 }}>
                      <img src={UserIcon} style={{ width: '80px' }} alt="Logo" />
                      <Card.Title className='BannerContent mt-3 mb-0'><strong>{details.firstName} {details.lastName}</strong></Card.Title>
                      <Card.Text className='BannerContent'>Name</Card.Text>
                    </Col>

                    <Col className='text-start' lg={8}>
                      <div className='d-flex justify-content-center justify-content-lg-start mt-3 mt-lg-0'>
                        <h3 className='BrandTitle mb-0'>Information</h3>
                        <Link
                          onClick={() => setOpen(!open)}
                          aria-controls="example-collapse-text"
                          aria-expanded={open}
                          className='mx-2 my-lg-1 text-dark'
                        >
                          <IoSettingsSharp size={25} />
                        </Link>
                      </div>

                      <hr className='text-primary' />

                      <Collapse in={open}>
                        <div id="example-collapse-text">
                          <h4 className='Settings'>Settings</h4>
                          <ul>
                            <li><UpdateProfile /></li>
                            <li><ResetPassword /></li>
                          </ul>


                        </div>
                      </Collapse>

                      <ul className='mt-4'>
                        <div className='mb-4'>
                          <h5 className='BannerContent'><strong>Email:</strong></h5>
                          <p className='BannerContent'>{details.email}</p>
                        </div>
                        <div>
                          <h5 className='BannerContent'><strong>Address:</strong></h5>
                          <p className='BannerContent'>{details.address}</p>
                        </div>
                      </ul>

                    </Col>
                  </Row>
                  <Divider><Chip label="Purchase History" className='m-4' /></Divider>
                  <Table responsive>
                    <tbody className='text-start'>
                      {orderHistory}
                      {/* {productDetails} */}
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Col>
          </Row>
        </div>
      </>
  )
}


