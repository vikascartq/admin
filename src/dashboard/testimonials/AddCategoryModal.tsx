import type { AddCategoryModalProp } from "@/types/category.type";
import { useContext, useState } from "react";
import { TestimonialContext } from "./context/TestimonialContext";
import {
  BaseModal,
  Button,
  TextInput,
  TextArea,
  FormSection,
  FormFooter,
} from "@/ui";

export default function AddCategoryModal({
  isOpen,
  onOpenChange,
}: AddCategoryModalProp) {
  const { formik } = useContext(TestimonialContext);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await formik.submitForm();
    setSubmitting(false);
  };

  const handleClose = () => {
    formik.resetForm();
    onOpenChange();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={formik.values.id ? "Edit Testimonial" : "Create Testimonial"}
      size="md"
      footer={
        <FormFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" loading={submitting} onClick={handleSubmit}>
            {formik.values.id ? "Update Testimonial" : "Create Testimonial"}
          </Button>
        </FormFooter>
      }
    >
      <div className="flex flex-col gap-8">
        <FormSection title="Personal Information" description="Name and role of the person">
          <TextInput
            label="Name"
            name="name"
            placeholder="e.g. John Doe"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.name}
            touched={formik.touched.name}
            required
          />

          <TextInput
            label="Role"
            name="role"
            placeholder="e.g. CEO at Acme Inc."
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.role}
            touched={formik.touched.role}
          />
        </FormSection>

        <FormSection title="Testimonial" description="What they have to say">
          <TextArea
            label="Description"
            name="description"
            placeholder="Write the testimonial content here..."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.description}
            touched={formik.touched.description}
            rows={5}
            required
          />
        </FormSection>
      </div>
    </BaseModal>
  );
}
