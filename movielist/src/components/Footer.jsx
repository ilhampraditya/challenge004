import {
  CDBModalFooter,
  CDBBtn,
  CDBIcon,
 CDBBox,
} from "cdbreact";

export const Footer = () => {
  return (
    <CDBModalFooter className="shadow mt-3 ">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: "80%"}}
      >
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center p-0 text-danger">
            
            <div className="h5 mb-0 font-weight-bold" >MovieList</div>
          </a>
        </CDBBox>
        <CDBBox>
          <small className="ms-2 text-dark">
            &copy; MovieList, 2023. All rights reserved.
          </small>
        </CDBBox>
        <CDBBox display="flex ">
          <CDBBtn flat color="danger" className="p-2">
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
          <CDBBtn flat color="danger" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn flat color="danger" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </CDBModalFooter>
  );
};
