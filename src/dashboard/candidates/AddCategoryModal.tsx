import type { AddCategoryModalProp } from "@/types/category.type";
import { useContext, useState } from "react";
import { CandidateContext } from "./context/CandidateContext";
import {
  BaseModal,
  Button,
  TextInput,
  TextArea,
  TagInput,
  ImageSelect,
  FormSection,
  FormFooter,
} from "@/ui";

export default function AddCategoryModal({
  isOpen,
  onOpenChange,
}: AddCategoryModalProp) {
  const { formik } = useContext(CandidateContext);
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

  const handleAddSkill = (skill: string) => {
    formik.setFieldValue("skills", [...formik.values.skills, skill]);
  };

  const handleRemoveSkill = (skill: string) => {
    formik.setFieldValue(
      "skills",
      formik.values.skills.filter((s) => s !== skill)
    );
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={formik.values.id ? "Edit Candidate" : "Create Candidate"}
      size="lg"
      footer={
        <FormFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" loading={submitting} onClick={handleSubmit}>
            {formik.values.id ? "Update Candidate" : "Create Candidate"}
          </Button>
        </FormFooter>
      }
    >
      <div className="flex flex-col gap-8">
        <FormSection title="Basic Information" description="Role and description of the candidate">
          <TextInput
            label="Role"
            name="role"
            placeholder="e.g. Frontend Developer"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.role}
            touched={formik.touched.role}
            required
          />

          <TextArea
            label="Description"
            name="description"
            placeholder="Brief description of the candidate"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.description}
            touched={formik.touched.description}
            rows={4}
          />
        </FormSection>

        <FormSection title="Skills" description="Add relevant skills for this candidate">
          <TagInput
            label="Skills"
            tags={formik.values.skills}
            onAdd={handleAddSkill}
            onRemove={handleRemoveSkill}
            placeholder="Type a skill and press Enter"
          />
        </FormSection>

        <FormSection title="Profile Image" description="Select an image for the candidate card">
          <ImageSelect
            label="Image"
            value={formik.values.imageName}
            onChange={(val) => formik.setFieldValue("imageName", val)}
            error={formik.errors.imageName}
            touched={formik.touched.imageName}
          />
        </FormSection>
      </div>
    </BaseModal>
  );
}
