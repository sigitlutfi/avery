function formatRupiah(value) {
  // Convert the value to a string, ensuring it's a number
  const numberString = value.toString();

  // Split the string into the whole part and decimal part
  const splitNumber = numberString.split(',');

  // Format the whole part with a dot as the thousands separator
  const sisa = splitNumber[0].length % 3;
  let rupiah = splitNumber[0].substr(0, sisa);
  const ribuan = splitNumber[0].substr(sisa).match(/\d{3}/gi);

  // Add the thousands separator
  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  // Append the decimal part or ",00" if none is provided
  rupiah =
    splitNumber[1] !== undefined ? rupiah + ',' + splitNumber[1] : rupiah;

  // Add the "Rp." prefix
  return 'Rp. ' + rupiah;
}
export default formatRupiah;
