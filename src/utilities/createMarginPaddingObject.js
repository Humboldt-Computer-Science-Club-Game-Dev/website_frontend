const createMarginPaddingStyles = props => {
	return {
		marginTop: props?.applyCustomMargin ? props.marginTop + props.marginUnits : 0,
		marginRight: props?.applyCustomMargin ? props.marginRight + props.marginUnits : 0,
		marginBottom: props?.applyCustomMargin ? props.marginBottom + props.marginUnits : 0,
		marginLeft: props?.applyCustomMargin ? props.marginLeft + props.marginUnits : 0,
		paddingTop: props?.applyCustomPadding ? props.paddingTop + props.paddingUnits : 0,
		paddingRight: props?.applyCustomPadding ? props.paddingRight + props.paddingUnits : 0,
		paddingBottom: props?.applyCustomPadding ? props.paddingBottom + props.paddingUnits : 0,
		paddingLeft: props?.applyCustomPadding ? props.paddingLeft + props.paddingUnits : 0,
	};
};

export default createMarginPaddingStyles;
