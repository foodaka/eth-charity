import swal from 'sweetalert2'


export const SweetAlert = (swalOptions) => {
  console.log('swalOptions', swalOptions);
  return swal(swalOptions);
}
