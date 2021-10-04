import { Nav } from "react-bootstrap";

const ProductNav = (props) => {

    const { navSwitch, page } = props;

    if (page === "products") {
        var href1 = "/categories/products"
        var href2 = "/categories/update_products"
    } else if (page === "users") {
        var href1 = "/categories/users"
        var href2 = "/categories/users/updateinfousers"
    }

    if (navSwitch === "Register") {
        return (
            <div className="dark-background-nav">
                <Nav className="justify-content-end mt-1 mb-2">
                    <Nav.Item>
                        <Nav.Link href={href1} disabled>Registro</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={href2}>Gestión</Nav.Link>
                    </Nav.Item>
                </Nav >
            </div >
        )

    } else if (navSwitch === "Management") {
        return (
            <Nav className="justify-content-end mt-1 mb-2">
                <Nav.Item>
                    <Nav.Link href={href1}>Registro</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={href2} active disabled>Gestión</Nav.Link>
                </Nav.Item>
            </Nav >
        )

    }
}

export default ProductNav;