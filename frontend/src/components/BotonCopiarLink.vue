<template>
  <button @click="copiarUrl(cliente.id_secreto)">Copiar Link</button>
</template>

<script>
export default {
  name: 'BotonCopiarLink',
  props: {
    cliente: {
      type: Object,
      required: true,
    },
  },
  methods: {      
    copiarUrl(clienteId) {
      const url = `${window.location.origin}/vista-cliente?cliente_id=${clienteId}`;
      navigator.clipboard.writeText(url);
      alert('URL copiada al portapapeles');
    },
  },
}
</script>