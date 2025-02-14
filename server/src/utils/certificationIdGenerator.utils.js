const Certification = require("./../models/certification.models");

const generateCertificateId = async (prefix) => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = String(currentDate.getFullYear()).slice(-2);
  const datePart = `${day}${month}${year}`;

  const lastCertificate = await Certification.findOne({
    certificateId: { $regex: `^${prefix}/${datePart}/CS\\d{2}$` },
  })
    .sort({ certificateId: -1 })
    .exec();

  let sequenceNumber = "01";

  if (lastCertificate) {
    const lastId = lastCertificate.certificateId;
    const lastSequence = parseInt(lastId.split("CS")[1], 10);
    sequenceNumber = String(lastSequence + 1).padStart(2, "0");
  }

  return `${prefix}/${datePart}/CS${sequenceNumber}`;
};

module.exports = generateCertificateId;
