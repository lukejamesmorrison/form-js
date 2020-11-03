export default {

    /**
     * Should form validate when submitted? If disabled, form 
     * validation must be done manually or by section.
     */
    validateOnSubmit: true,

    /**
     * Should form require all fields to be in a section if at least one section 
     * has been defined? This ensures fields are not missed in validation 
     * if you decide to disable validation on submit (validateOnSubmit).
     */
    strictSections: false,

    /**
     * Does the form have a final section which should not count towards completion progress?  
     * If False, the final section will not indicate 100% completion.  If True, the final
     * section will not be considered towards form completion progress.
     */
    finalSectionForReview: false,

}
