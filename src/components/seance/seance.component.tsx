import SeanceForm from "./seance-form.component";
import { useNavigate } from 'react-router-dom';

const Seance: React.FC = () => {
    const navigate = useNavigate();



    return (
        <div>
            <button className='btn btn-primary' onClick={() => navigate("/seance-form")}>Create Seance</button>
        </div >
    );
}

export default Seance
