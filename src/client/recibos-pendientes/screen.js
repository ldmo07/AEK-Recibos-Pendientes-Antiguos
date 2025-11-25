import React, { useState } from "react";
import { useAxiosReciboPendientes } from "../../hooks/useAxiosReciboPendientes";
import { useAxiosDatosPersonales } from "../../hooks/useAxiosDatosPersonales";
import { urlPagoPSE } from "../../helpers/serviciosUrl";
import { mostrarAlertaError } from "../../helpers/alertasHelper";
//DEFINO LOS ESTILOS
const estiloFuentes = {
  fontFamily: 'Helvetica',
  fontSize: '12px'
};

const estiloBadges = {
  backgroundColor: '#779B00',//'#2C3A49',
  color: 'white',
  marginRight: '5px',
  padding: '5px 10px',
  borderRadius: '5px',
  display: 'inline-block'
};

const estiloBase = {
  backgroundColor: '#151b60',//'#2C3A49'
}

const estiloHover = {
  backgroundColor: '#4F6175',
  color: 'white'
}

export default Screen = () => {

  //Manejara el estado para ver si se hizo hover sobre un elemento
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredPse, setIsHoveredPse] = useState(false);

  const { userData } = useAxiosDatosPersonales();
  const { idUser, recibos, cargando } = useAxiosReciboPendientes(userData);

  if (cargando) {
    return (<h2 style={estiloBadges}>...cargando</h2>)
  }

  return (
    <>
      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />

      {
        recibos.length > 0 ? (
          <div className="container mx-auto px-4 py-5 bg-gray p-2" style={estiloFuentes}>
            <div className="flex flex-col space-y-4 bg-white rounded-md shadow-md p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      N° Recibo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conceptos
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descargar
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pago PSE
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* {
                    recibos.map(recibo => (
                      <tr key={recibo.NOMBREPDF}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          FACTURA - {recibo.FACTURA.trimStart().replace(/^0+/g, "")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={recibo.RUTA} onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)} style={isHovered ? estiloHover : estiloBase}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" download={recibo.NOMBREPDF}>
                            Descargar
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`${urlPagoPSE}${recibo.IDPSE}`} onMouseEnter={() => setIsHoveredPse(true)}
                            onMouseLeave={() => setIsHoveredPse(false)} style={isHoveredPse ? estiloHover : estiloBase}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Pago PSE
                          </a>
                        </td>
                      </tr>
                    ))
                  } */}

                  {
                    [...recibos]
                      .sort((a, b) => {
                        // Usar el operador unario + para convertir la cadena a número
                        // Esto funciona bien para cadenas de números enteros, incluso con ceros a la izquierda
                        const facturaA = +a.FACTURA;
                        const facturaB = +b.FACTURA;

                        // Para orden descendente (mayor a menor), restamos b - a
                        return facturaB - facturaA;
                      })
                      .map((recibo, index) => (
                        <tr key={recibo.NOMBREPDF}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {recibo.FACTURA.trimStart().replace(/^0+/, "")}
                          </td>
                          <td>
                            {recibo.MATERIALES.map(materialObj => materialObj.MATERIAL).join(', ')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a href={recibo.RUTA} onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)} style={isHovered ? estiloHover : estiloBase}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" download={recibo.NOMBREPDF}>
                              Descargar
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* Si no viene un idPSE al darle click al boton de pse muestra alerta con mensaje de error */}
                            {recibo.IDPSE && recibo.IDPSE.trim() !== "" ?
                              (
                                <a href={`${urlPagoPSE}${recibo.IDPSE}`} onMouseEnter={() => setIsHoveredPse(true)}
                                  onMouseLeave={() => setIsHoveredPse(false)} style={isHoveredPse ? estiloHover : estiloBase}
                                >
                                  {/* <img style={{ maxWidth: "10%", cursor: "pointer" }} src="https://storage-masivdrive.masivapp.com/1703/98f65ca6-11a6-4aee-9260-9ade652ca57f/4794c789-5271-4343-89bd-01db134eed4b/eb9bcb10-b9d3-4c27-897c-05113a4a35b0/f5ae2a2c-4241-4220-a112-3e348bccc988.png" /> */}
                                  <img style={{ width: "40px", cursor: "pointer" }} src="https://storage-masivdrive.masivapp.com/1703/98f65ca6-11a6-4aee-9260-9ade652ca57f/4794c789-5271-4343-89bd-01db134eed4b/eb9bcb10-b9d3-4c27-897c-05113a4a35b0/f5ae2a2c-4241-4220-a112-3e348bccc988.png" />
                                </a>
                              ) :
                              (
                                <a onClick={() => mostrarAlertaError("Este recibo de matrícula no se puede pagar por PSE debido a que no se encontró un valor de matrícula para la fecha 1. Por favor, comuníquese con el área de Matriculas de su sede.")}
                                  onMouseLeave={() => setIsHoveredPse(false)} style={isHoveredPse ? estiloHover : estiloBase}
                                >
                                  <img style={{ width: "40px", cursor: "pointer" }} src="https://storage-masivdrive.masivapp.com/1703/98f65ca6-11a6-4aee-9260-9ade652ca57f/4794c789-5271-4343-89bd-01db134eed4b/eb9bcb10-b9d3-4c27-897c-05113a4a35b0/f5ae2a2c-4241-4220-a112-3e348bccc988.png" />
                                </a>
                              )
                            }
                          </td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-5 bg-gray p-2">
            <div className="flex flex-col space-y-4 bg-white rounded-md shadow-md p-4" style={estiloFuentes}>
              <h2>No se encontraron recibos</h2>
            </div>
          </div>
        )
      }


    </>
  );



}
