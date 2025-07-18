import React from "react";
import PropTypes from "prop-types";
import "./CustomButton.css";

/**
 * ✅ Reusable (ponovo upotrebljiva) Custom dugmad komponenta.
 * Omogućava prilagođavanje stila, teksta i funkcionalnosti dugmeta.
 *
 * @param {string} text - Tekst koji će biti prikazan na dugmetu.
 * @param {string} type - Tip dugmeta: "solid" (ispunjeno) ili "outline" (konturirano).
 * @param {function} onClick - Funkcija koja će se izvršiti kada se dugme klikne.
 * @param {boolean} disabled - Da li je dugme onemogućeno (podrazumevano: false).
 */

const CustomButton = ({ text, type, onClick, disabled }) => {
  return (
    <button className={`custom-button ${type}`} onClick={onClick} disabled={disabled} style={{margin:"10px"}}>
      {text}
    </button>
  );
};

// ✅ Definišemo propTypes kako bismo osigurali da se prosleđeni podaci pravilno koriste
CustomButton.propTypes = {
  text: PropTypes.string.isRequired, // Tekst na dugmetu je obavezan
  type: PropTypes.oneOf(["solid", "outline"]), // Dugme može biti ili "solid" ili "outline"
  onClick: PropTypes.func, // Klik funkcija (nije obavezna)
  disabled: PropTypes.bool, // Omogućavanje/disabling dugmeta (nije obavezno, podrazumevano false)
};

// ✅ Postavljamo podrazumevane vrednosti za propse
CustomButton.defaultProps = {
  type: "solid", // Podrazumevano je ispunjeno dugme
  onClick: () => {}, // Ako nije prosleđena funkcija, podrazumevano ne radi ništa
  disabled: false, // Dugme nije onemogućeno podrazumevano
};

export default CustomButton;
