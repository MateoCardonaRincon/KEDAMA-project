import { Col, Modal } from "react-bootstrap";
import api from "../../../api";

const RegisterButton = (props) => {
    const { info, action, modalSettings,
        setModalSettings, missing, setMissing } = props.properties;

    // Setting modal info based on action
    if (modalSettings.type === "register") {
        var modalHeader = "¡Resgistro exitoso!"
        var modalBody = "Producto creado con el ID " + info.id + "."
    } else if (modalSettings.type === "warning") {
        modalHeader = "¡Atención!"
        modalBody = "Diligencie todos los campos requeridos."
    } else if (modalSettings.type === "update") {
        modalHeader = "¡Actualización exitosa!"
        modalBody = "Se actualizó correctamente el producto con ID " +
            document.getElementById("filter-input").value + "."
    } else if (modalSettings.type === "serverError") {
        modalHeader = "¡Atención!"
        modalBody = "Ya existe un producto con la descripción especificada."
    } else if (modalSettings.type === "unableUpdate") {
        modalHeader = "¡Atención!"
        modalBody = "Para modificar un registro, por favor presione " +
            "el botón azul de la fila correspondiente al producto que desea actualizar."
    }

    // Setting red border and modal feedback
    const triggerMissingCells = () => {
        if (info.description !== "") {
            missing.description = false
        } else { missing.description = true }
        if (info.price !== "") {
            missing.price = false
        } else { missing.price = true }
        if (info.state !== "") {
            missing.state = false
        } else { missing.state = true }
        setMissing(missing)
        // Triggering alert modal
        setModalSettings({ show: true, type: "warning" })
    }

    // Register button action
    const registerBtn = async (event) => {
        // Looking for missing fields. if true -> save record
        if (info.description !== "" && info.price !== "" && info.state !== "") {

            // reset red borders
            setMissing({ description: false, price: false, state: false })

            // POST request to api
            const response = await api.products.create({
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        id: info.id + 1,
                        description: info.description,
                        price: parseInt(info.price),
                        state: info.state
                    }
                )
            })

            if (response.error) {
                setModalSettings({ show: true, type: "serverError" })
            } else {// Triggerring success register modal
                info.id = info.id + 1
                setModalSettings({ show: true, type: "register" })
            }

        } else {
            triggerMissingCells()
        }
    }

    // Update button action
    const updateBtn = async () => {
        // Looking for missing fields. if true -> update record by id
        if (info.description !== "" && info.price !== "" && info.state !== "") {

            // reset red borders
            setMissing({ description: false, price: false, state: false })

            // PUT request to api
            const response = await api.products.update(info._id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        description: info.description,
                        price: parseInt(info.price),
                        state: info.state
                    }
                )
            });

            if (response.error) {
                setModalSettings({ show: true, type: "serverError" })
            } else {// Triggerring success update modal
                setModalSettings({ show: true, type: "update" })
            }
        } else {
            if (action) {
                triggerMissingCells()
            } else {
                (setModalSettings({ show: true, type: "unableUpdate" }))
            }

        }
    }

    const handleClose = () => {
        setModalSettings({ show: false, type: "" })
        if (["update", "register"].includes(modalSettings.type)) { window.location.reload() }

    };

    return (

        <Col className="d-flex justify-content-between">
            <button
                className="btns"
                type="submit"
                onClick={updateBtn}>Actualizar
            </button>

            <button
                className="btns"
                type="submit"
                onClick={registerBtn}
                variant="primary">Registrar
            </button>

            <Modal show={modalSettings.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <button variant="primary" onClick={handleClose}>
                        Aceptar
                    </button>
                </Modal.Footer>
            </Modal>
        </Col>

    )
}

export default RegisterButton;