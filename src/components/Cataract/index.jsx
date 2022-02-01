import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DropdownWindow from 'components/DropdownWindows';

export default function Cataract() {
  const [cataracts, setCataracts] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/contents`)
      .then(({ data }) => {
        setCataracts(data);
      })
      .catch(() => {
        toast.error('Une erreur est survenue !', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  }, []);
  const dicoPages = {
    '/': 1,
    '/glaucoma': 2,
    '/cataract': 3,
    '/refractive': 4,
  };

  const pagesUrl = useLocation().pathname;
  return (
    <>
      {cataracts
        .filter((data) => {
          return parseInt(data.idPages, 10) === dicoPages[pagesUrl];
        })
        .map((cataract) => {
          return (
            <DropdownWindow
              key={cataract.id}
              title={cataract.title}
              content={cataract.text}
              idContent={cataract.id}
            />
          );
        })}
    </>
  );
}
