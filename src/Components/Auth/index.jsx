import React, { useContext, useState } from "react";
import { SignUpWrapper } from "./SignUp.styles";
import Logo from "../../assets/authentication/Logo.png";
import bgImg from "../../assets/authentication/bg-img.png";
import TextField from "../TextField/TextField";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Context";
import { serverDomain } from "../../Constant/serverDomain";
import axios from "axios";

const SignUp = ({ setUser, setFormData,formData }) => {
  const navigate = useNavigate();
  const { setEmail } = useContext(AuthContext);
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail(emailInput);
    try {
      const response = await axios.get(
        `${serverDomain}/coach?email=${emailInput}`
      );

      console.log("response", response);
      if (response.data?.status !== true) {
        setFormData({
          ...formData,
          email: emailInput,
        });
        navigate("/otp");
      } else {
        setUser(response.data.id);
        console.log(response.data.id)
        navigate("/editprofile");
      }
      console.log("Email:", emailInput);
    } catch (error) {
      console.log(error);
      navigate("/otp");
    }
  };

  const handleInputChange = (e) => {
    setEmailInput(e.target.value);
  };

  return (
    <SignUpWrapper>
      <div className="imgHolder">
        <img src={bgImg} alt="" />
      </div>
      <div className="formHolder">
        <form onSubmit={handleSubmit}>
          <div className="textHolder">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
            <p>
              Welcome to our Evolve - X platform!
              <br /> Enhance your skills and broaden your knowledge.
            </p>
          </div>
          <div className="inputHolder">
            <TextField
              parentClass="emailWrapper"
              className="input-field"
              field_Name="email"
              type="email"
              placeholder="Enter Your Official Email-id"
              value={emailInput}
              onChange={handleInputChange}
              bgClr="rgba(255, 255, 255, 0.37)"
            />
          </div>
          <Button width="208px" type="submit">
            Continue
          </Button>
        </form>
      </div>
    </SignUpWrapper>
  );
};

export default SignUp;
