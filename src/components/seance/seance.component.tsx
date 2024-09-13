import SeanceForm from "./seance-form.component";
import { useNavigate } from 'react-router-dom';
import { getSeanceTemplate } from "../../services/seance_template.service";
import { useEffect, useState } from "react";
import SeanceTemplate from "../../types/seance_template.type";

const SeanceComponent: React.FC = () => {
    const navigate = useNavigate();


    const [seance_template, setSeanceTemplate] = useState<SeanceTemplate[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTemplate = async () => {
            try {
                const seance_template = await getSeanceTemplate();
                setSeanceTemplate(seance_template);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        getTemplate();
    }, []);


    return (
        <div className="container">
            <div className="row">
                <h1>Template de seance enregistrés</h1>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-primary col-lg-5' onClick={() => navigate("/seance-form")}>Create Seance</button>
                    <button className='btn btn-primary col-lg-5' onClick={() => navigate("/seance-template")}>Create Seance template</button>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {seance_template.length > 0 ? (
                    <ul className="col-lg-12 list">
                        <div className="row mt-5 d-flex">
                            {seance_template.map(item => (
                                <li className="col-lg-2 block-separation mb-4 me-4" key={item.name}>
                                    <h3>{item.name}</h3>
                                    {item.exercice && item.exercice.length > 0 ? (
                                        <ul className="list">
                                            {item.exercice.map((ex, index) => (
                                                <li className="fs-5" key={index}>{ex.name}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No exercises available</p>
                                    )}
                                </li>
                            ))}
                        </div>
                    </ul>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
}

export default SeanceComponent;
