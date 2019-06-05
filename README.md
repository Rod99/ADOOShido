# Proyecto ADOO "Smart Choice"

<p>Smart Choice es un sistema enfocado en gestionar el inventario y sistema de ventas de peque&ntilde;as empresas,
facilitando la toma de decisiones de marketing y mostrando estad&iacute;sticas confiables y precisas.</p>

<h2>Funcionamiento</h2>

<p>Smart Choice es un sistema enfocado al funcionamiento multiplataforma, por lo que hace uso de tecnologías vigentes,tales como NodeJS, MongoDB (Bases de datos no relacionales) y Docker (contenedores), además de multiples recursos gráficos para que la experiencia del usuario sea la más cómoda.</p>
 
 <p>El diseño y planeación del sistema se ha realizado con el objetivo de presentar un producto que resuelva adecuadamente
 una problematica. Mas detalles de dicho diseño se pueden encontrar en el archivo de <i><b><a href="documentacion.pdf">documentacion</a></b></i></p>
  
<h2>Front-End</h2>

<p>Se optó por un flujo donde el usuario puede navegar entre las principales opciones, en donde podrá agregar productos,
 editarlos, revisar su inventario, generar estadísticas de ventas y generar sus reportes. La estructura principal del Front-End
 se encuentra en la carpeta <i><b>pages</b></i></p>
 
 <p><b>Tecnologías Utilizadas:</b> HTML5, CSS3, Bootstrap4, JQuery</p>
 
<h2>Back-End</h2>

<p>
 La plataforma está desarrollada con tecnología Web para generar una WebApp, de esta forma no es necesario invertir en un desarrollo para cada sistema operativo que haya en el mercado (iOS, Android, PC, etc.).
Mediante NodeJS y mongoose se desarrollo una api REST. Esto nos permite tener una separación entre el cliente y el servidor: el protocolo REST separa totalmente la interfaz de usuario del servidor y el almacenamiento de datos. Eso tiene algunas ventajas cuando se hacen desarrollos. Por ejemplo, mejora la portabilidad de la interfaz a otro tipo de plataformas, aumenta la escalabilidad de los proyectos y permite que los distintos componentes de los desarrollos se puedan evolucionar de forma independiente.</p>
<p>
 Un problema muy común en el desarrollo de proyectos en equipo es la falta de coordinación a la hora de montar los servidores en los equipos para realizar pruebas, con esto en mente hemos utilizado Docker, que es una tecnología de contenedores en la cual mediante archivos llamados Dockerfile y docker-compose se levantan contenedores ligeros y portables para las aplicaciones software que puedan ejecutarse en cualquier máquina con Docker instalado, independientemente del sistema operativo que la máquina tenga por debajo.
</p>
 
 <p><b>Tecnologías Utilizadas:</b> NodeJS y MongoDB</p>
 
 <h2>Indicaciones de Ejecución</h2>
 
 <p>Para poder acceder a las funcionalidades del sistema es necesario contar con Docker, estar en la raíz del proyecto e ingresar el comando "docker-compose up", la ejecución de basa en el archivo "docker-compose.yml"</p>
 
 
 <h2>Conclusi&oacute;n</h2>
 
 <p>La presente propuesta es sin duda interesante, el trabajo de planeación y diseño es bastante claro, completo y permite reconocer el alcance e impacto social de dicha aplicación. Desafortunadamente, la conclusión de un prototipo completamente funcional ha sido una meta que no se ha podido alcanzar como podría desearse, sin embargo, es palpable el uso de tecnologías, métodos de análisis y diseño en dicha maquetación, lo que puede considerarse como un buen resultado y un aprendizaje integral.</p>
