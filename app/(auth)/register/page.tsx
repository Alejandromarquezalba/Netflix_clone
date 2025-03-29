import Link from "next/link";
import Terms from "../components/terms/terms";
import { RegisterForm } from "./registerForm";

export default function RegisterPage() {
    return (
        <div>
            <p className="text-3xl font-bold text-left mb-7">Registro de Usuario</p>

            <RegisterForm></RegisterForm>

            <div>
                <p className="text-gray-600 mt-4"> ¿Ya tienes cuenta?<br/></p>
                <Link href='/login'> 
                    <span className="inline-block hover:scale-103 transition-all ">
                        Ingresar con mi cuenta
                    </span>
                </Link>
            </div>    

            <Terms></Terms>
        </div>

        
    )
}
