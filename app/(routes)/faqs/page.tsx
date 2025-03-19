import { AccordionFaqs } from "./components/AccordionFaqs";

export default function pageFaqs() {
  return (
    <div className="max-wxl mx-auto bg-background shadow-md rounded-lg p-6">
      <h2 className="mb-8 text-3xl">FAQS</h2>
      <div className="mb-5">
        <p>
          Bienvenido a la sección de Preguntas Frecuentes (FAQS), esta pagina
          esta diseñada especificamente para brindar respuestas rapidas y claras
          sobre el dashboard para la empresa CasaLuker que hemos desarrollado
          con pasión y dedicacion
        </p>
        <p>
          En nuestra pagina de FAQS, encontrarás una recopilacion de las
          preguntas mas comunes que nuestro usuarios suelen hacer sobre el
          funcionamiento. Desde cómo registrarte en la plataforma hasta cómo
          solucionar problemas técnicos comunes, estamos aquí para ayudarte.
          hasta como aprovechar al maximo sus funciones
        </p>
      </div>
      <AccordionFaqs />
    </div>
  );
}
