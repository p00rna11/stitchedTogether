<template>
  <div class="body login-container" style="margin-top: 20px; display: flex; flex-direction: row;">
    <div style="display: flex; flex-direction: column">
      <figure class="figures one">
        <img src="../assets/lilo.jpg" alt="Lilo"></img>
        <figcaption >Lilo</figcaption>
      </figure>

      <figure class="figures two">
        <img src="../assets/stitch.jpg" alt="Stitch"></img>
        <figcaption>Stitch </figcaption>
      </figure>
    </div>
    <div class="login">

      <h1>Login</h1>
      <form @submit.prevent="loginUser">
        <div class="login-container">
          <input v-model="name" placeholder="Name" required />
          <input v-model="email" placeholder="Email" required />
          <button type="submit">Login</button>
        </div>
      </form>
      <figure class="figures five">
        <img src="../assets/patty.jpeg" alt="patie"></img>
        <figcaption>Pattie</figcaption>
      </figure>
    </div>
    <div style="display: flex; flex-direction: column">
      <figure class="figures three">
        <img src="../assets/milo.jpeg" alt="Auggie"></img>
        <figcaption>Auggie</figcaption>
      </figure>

      <figure class="figures four">
        <img src="../assets/milos.jpeg" alt="Milo"></img>
        <figcaption>Milo</figcaption>
      </figure>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/api';

const name = ref('');
const email = ref('');
const router = useRouter();

const loginUser = async () => {
  try{
    await login(name.value, email.value);
  localStorage.setItem('isAuthenticated', 'true');
  router.push('/search');
  }catch(err){
    console.log(err);
    alert('Login failed'+ err);
  }
  
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.figures { 
  position: relative;
  background:rgb(253, 253, 218) ;
  padding: 15px;
  height: 250px;
  max-width: 100%;
  overflow: hidden;
  float: left;
  box-shadow: 0 10px 20px rgba(0, 0, 0, .3);
  animation: figures ease-in-out 0.5s infinite alternate;
  transform-origin: center -36px;
}
figcaption {
  color: rgb(0, 0, 0);
  font-style: italic;
  padding: 2px;
  text-align: center;
  overflow: visible;
  z-index: 100;
}

.figures img {
  position: relative;
  top: 0;
  left: 0;
  max-width: 100%;
  border-radius: 8px;
  height: 200px;
}

.figure img{
  overflow: hidden;
}

.one{
  transform: rotate(-5deg);
}
.two{
  transform: rotate(8deg);
}
.three{
  transform: rotate(7deg);
}
.four{
  transform: rotate(-3deg);
}

.five{
  margin-top: 50px ;
  transform: rotate(-3deg);
}

img:hover {
  transition: .5s;
}

.one img:hover,figcaption,.five img:hover,
.four img:hover{
  transform: rotate(10deg) scale(1.2)
}

.two img:hover,figcaption, 
.three img:hover{
  transform: rotate(-7deg) scale(1.2)
}
</style>