import { Row } from "react-bootstrap";
import AutoId from "./AutoId.jsx"
import Product from "./ProductInput.jsx";
import Price from "./PriceInput.jsx";
import State from "./StateInput.jsx";
import Filter from "./Filter.jsx";
import RegisterButton from "./RegisterButton.jsx";
import UpdateButton from "./UpdateButton.jsx";
import { useState } from "react";

const ImputForm = (props) => {
    const { pageSwitch, records, setRecord, setShow, setAlert, autoId, setId, searchId, setSearchId } = props;
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [state, setState] = useState("");
    const [missing, setMissing] = useState({ description: false, price: false, state: false });

    console.log(missing)



    if (pageSwitch === "Register") {
        return (
            <Row className="d-flex justify-content-center">
                <AutoId setSearchId={setSearchId} />
                <Product setDescription={setDescription} missingInput={missing.description} />
                <Price setPrice={setPrice} missingInput={missing.price} />
                <State setState={setState} missingInput={missing.state} />
                {/* <Filter /> */}
                <RegisterButton records={records}
                    setRecord={setRecord}
                    description={description}
                    price={price}
                    state={state}
                    setShow={setShow}
                    setAlert={setAlert}
                    autoId={autoId}
                    setId={setId}
                    missing={missing}
                    setMissing={setMissing} />
            </Row>)
    } else {
        return (<Row className="d-flex justify-content-center">
            <Product />
            <Price />
            <State />
            {/* <Filter /> */}
            <UpdateButton />
        </Row>)
    }


}

export default ImputForm;