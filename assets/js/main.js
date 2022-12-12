document.addEventListener("DOMContentLoaded", () => {
    console.log("document loaded");
  
    const form = document.querySelector("#contactForm");
    const submitButton = document.querySelector("#submit");

    // Fonction pour vider les champs du formulaire
    const cleanForm = () => {
        form.reset();
    };

    // Fonction pour réactiver le bouton d'envoi du formulaire
    const isEnabled = () => {
        submitButton.removeAttribute("disabled");
        submitButton.classList.remove("disabled-btn");
    };

    // Fonction pour désactiver le bouton d'envoi du formulaire
    const isDisabled = () => {
        submitButton.setAttribute("disabled", "disabled");
        submitButton.classList.add("disabled-btn");
    };

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const data = {
          firstname: document.querySelector("#firstname").value,
          lastname: document.querySelector("#lastname").value,
          email: document.querySelector("#email").value,
          subject: document.querySelector("#subject").value,
          message: document.querySelector("#message").value,
        };
  
        console.log(data); 

        try {
        const response = await axios.post("http://localhost:3000/form", data);
        if (response.status === 200) {
            alert("Votre formulaire a bien été envoyé");
            cleanForm();
            isEnabled();
            // console.log(response);
        }
    } catch (e) {
        if (e.response.data.error === " Missing parameters") {
            alert("Veuillez remplir tous les champs du formulaire");
        } else {
            alert("Une erreur est survenue");
            cleanForm();
        }

        isEnabled();
    }
      });
  });