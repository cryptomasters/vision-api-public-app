(() => {
  "use strict";

  const setStatus = (form, message, isError = false) => {
    const status = form.querySelector(".form-status");
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  };

  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.passwordToggle);
      if (!input) return;
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      button.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  });

  document.querySelectorAll("[data-local-message]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest("form");
      if (form) setStatus(form, button.dataset.localMessage, false);
    });
  });

  document.querySelectorAll("[data-local-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));

      const invalid = [...form.elements].filter((field) =>
        typeof field.checkValidity === "function" && !field.checkValidity(),
      );
      if (invalid.length) {
        invalid.forEach((field) => field.setAttribute("aria-invalid", "true"));
        invalid[0].focus();
        setStatus(form, "Please complete the highlighted fields.", true);
        return;
      }

      if (form.dataset.localForm === "register") {
        const panel = form.closest(".auth-panel");
        const success = panel?.querySelector('[data-form-state="success"]');
        panel?.querySelector('[data-form-state="form"]')?.setAttribute("hidden", "");
        success?.removeAttribute("hidden");
        success?.focus();
        return;
      }

      setStatus(form, "Sign-in is not connected in this local build. No credentials were transmitted.", false);
      const password = form.querySelector('input[autocomplete="current-password"]');
      if (password) {
        password.value = "";
        password.type = "password";
        const toggle = form.querySelector(`[data-password-toggle="${password.id}"]`);
        toggle?.setAttribute("aria-label", "Show password");
      }
    });
  });

  const deletionButton = document.querySelector("[data-deletion-steps]");
  const deletionResult = document.querySelector("[data-deletion-result]");
  deletionButton?.addEventListener("click", () => {
    deletionResult?.removeAttribute("hidden");
    deletionButton.textContent = "Checklist ready";
    deletionButton.setAttribute("disabled", "");
  });
})();
