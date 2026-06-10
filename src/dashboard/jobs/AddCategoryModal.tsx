import type { AddCategoryModalProp } from "@/types/category.type";
import { useContext, useState } from "react";
import { JobsContext } from "./context/JobsContext";
import {
  BaseModal,
  Button,
  TextInput,
  TagInput,
  FormSection,
  FormFooter,
} from "@/ui";

export default function AddCategoryModal({
  isOpen,
  onOpenChange,
}: AddCategoryModalProp) {
  const { formik } = useContext(JobsContext);
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
      title={formik.values.id ? "Edit Job" : "Create Job"}
      size="md"
      footer={
        <FormFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" loading={submitting} onClick={handleSubmit}>
            {formik.values.id ? "Update Job" : "Create Job"}
          </Button>
        </FormFooter>
      }
    >
      <div className="flex flex-col gap-8">
        <FormSection title="Basic Information" description="Job name and location">
          <TextInput
            label="Job Name"
            name="jobName"
            placeholder="e.g. Senior Software Engineer"
            value={formik.values.jobName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.jobName}
            touched={formik.touched.jobName}
            required
          />

          <TextInput
            label="Location"
            name="location"
            placeholder="e.g. New York, NY"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.location}
            touched={formik.touched.location}
            required
          />
        </FormSection>

        <FormSection title="Skills" description="Add required skills for this job">
          <TagInput
            label="Skills"
            tags={formik.values.skills}
            onAdd={handleAddSkill}
            onRemove={handleRemoveSkill}
            placeholder="Type a skill and press Enter"
          />
        </FormSection>
      </div>
    </BaseModal>
  );
}
