import React, { Component } from 'react';
import '../CSS/style.css';
import {Link} from 'react-router-dom'
import $ from "jquery"
import axios from 'axios';
axios.defaults.withCredentials = true;
// import 'jquery/external/sizzle/dist/'
class HomePage extends Component {
   
    componentDidMount(){
           $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
    
        if (scroll >= 50) {
            $(".sticky").addClass("stickyadd");
        } else {
            $(".sticky").removeClass("stickyadd");
        }
    });
    
//     $('.navbar-nav a').on('click', function(event) {
//         var $anchor = $(this);
//         $('html, body').stop().animate({
//             scrollTop: $($anchor.attr('href')).offset().top - 0
//         }, 1500);
//         event.preventDefault();
//     });
      axios.get('http://localhost:1998/api/auth/login/check')
      .then(res=>{
        this.props.history.push('Mainpage');
      })
     
   
     
    }
  render() {
    return (
        <div>
        
        {/* START NAVBAR */}
        <nav className="navbar navbar-expand-lg fixed-top custom-nav sticky">
          <div className="container">
            {/* LOGO */}
            {/* <a className="navbar-brand logo" href="index.html">
              <img src="images/logo-battle.png" style={{width: 60, height: 60, marginLeft: '3%', position: 'relative', left: '-100%'}} alt className="img-fluid logo-light" />                  
            </a> */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a href="/" className="nav-link">TRANG CHỦ</a>
                </li>
                <li className="nav-item">
                  <a href="#about" className="nav-link">ĐĂNG NHẬP</a>
                </li>
                <li className="nav-item">
                  <Link to={'/register'} className="nav-link">ĐĂNG KÝ TÀI KHOẢN</Link>
                </li>
                <li className="nav-item">
                  <a href="#contact" className="nav-link">LIÊN HỆ</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* END NAVBAR */}
        {/* Home Section Start*/}
        <section className="bg_home_personal_img full_height_100vh_home" id="home">
          <div className="bg_overlay_cover_on" />
          <div className="home_table_cell">
            <div className="home_table_cell_center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className=" mx-auto text-center home_text_personal">
                      <h1 className="home_title  mt-4 font-weight-bold text-white mb-0"><span style={{color:"red"}}>THI ĐẤU</span> HAY <br/>NHẬN NGAY<br/><span className="simple-text-rotate font-weight-bold" style={{color:"red"}}> PHẦN THƯỞNG </span></h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Home Section End*/}
        {/* About me Start */}
        <section className="section_all" id="about">
          <div className="row mt-5">
            <div className="col-lg-5">
              <div className="mt-3">
              </div>
            </div>
            <div className="col-lg-7">
            <a href="/login" className="btn btn_custom_1 btn_round">Nếu Có Tài Khoản Thì Đăng Nhập Tại Đây</a>
              <div className="about_content_info mt-3">
                <div className="mt-4">
                  <a href="/register" className="btn btn_custom btn_round">Đăng Ký Tài Khoản Để Tạo Phòng Thi Đấu</a><br/>
                  
                </div>
                
              </div>
            </div>
          </div>
        </section>
        {/* About Me End */}
        {/* START CTA */}
        <section className="section_all bg_cta_image">
          <div className="bg_overlay_cover_on" />
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center text-white">
                  <h2 className="font-weight-bold">Hãy Tìm Đối Thủ Để Thi Đấu Nào!</h2>
                  <p className="mx-auto cta_details_mx mt-4 pt-2">Bạn hãy thi đấu hết sức mình dành chiến thắng để dành được phần quà hấp dẫn.</p>
                  <div className="mt-4 pt-3">
                    <Link to={'/login'} className="btn btn_outline_custom btn-rounded">Tạo Phòng Thi Đấu</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END CTA */}
        {/* Contact Us Start */}
        <footer className="section_all bg-light" id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section_title text-center">
                  <p className="mb-0">LIÊN HỆ</p>
                  <h3 className="font-weight-bold text-capitalize mb-0">LIÊN HỆ</h3>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-12">
                <div className="text-center">
                  <button type="button" className="btn btn_custom btn_round" data-toggle="modal" data-target="#exampleModalCenter">LIÊN HỆ VỚI CHÚNG TÔI</button>
                  {/* Modal */}
                  <div className="modal fade" id="exampleModalCenter">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title mb-0 font-weight-bold" id="exampleModalLongTitle"> LIÊN HỆ</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form className="custom_form_body">
                            <div className="form-group">
                              <input type="text" className="form-control" id="fname" placeholder="First Name" />
                            </div>
                            <div className="form-group">
                              <input type="email" className="form-control" id="semail" placeholder="Email" />
                            </div>
                            <div className="form-group">
                              <input type="text" className="form-control" id="sbject" placeholder="Subject" />
                            </div>
                            <div className="form-group mt-2">
                              <textarea name="comments" id="comments" rows={6} className="form-control" placeholder="Your message..." defaultValue={""} />
                            </div>
                            <div>
                              <button className="btn btn_custom w-50">Submit</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12">
                <div className="contact_social_icons text-center mt-3">
                  <ul className="list-unstyled">
                    <li className="list-inline-item"><a href="#"><i className="mdi mdi-facebook" /></a></li>
                    <li className="list-inline-item"><a href="#"><i className="mdi mdi-twitter" /></a></li>
                    <li className="list-inline-item"><a href="#"><i className="mdi mdi-google-plus" /></a></li>
                  </ul>
                  <p className="font-weight-bold mt-4">Số Điện Thoại: 0868 177 610</p>
                  <div className="mt-4">
                    <p className="text-muted mb-0">© Copyright | KMAVN Team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        

      </div>
    );
  }
}

export default HomePage;
