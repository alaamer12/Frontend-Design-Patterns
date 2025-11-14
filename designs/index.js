/**
 * Frontend Design Patterns - Central Export File
 * 
 * This file exports all 14 React design patterns for easy importing.
 * Each pattern is fully implemented with professional code quality,
 * comprehensive documentation, and interactive demonstrations.
 * 
 * @module designs
 */

// Structural Patterns
import AtomicComponents from "./AtomicComponents/AtomicComponents.jsx";
import ComponentComposition from "./ComponentComposition/ComponentComposition.jsx";
import CompoundComponent from "./CompoundComponents/CompoundComponent.jsx";
import StatefulAndStatelessComponent from "./StatefulAndStatelessComponents/StatefulAndStatelessComponent.jsx";

// Behavioral Patterns
import ControlledProps from "./ControlleredProps/ControlledProps.jsx";
import StateReducer from "./StateReducer/StateReducer.jsx";
import CustomHook from "./CustomHook/CustomHook.jsx";
import ProviderPattern from "./ProviderPattern/ProviderPattern.jsx";

// Compositional Patterns
import ComponentInjection from "./ComponentInjection/ComponentInjection.jsx";
import RenderProps from "./RenderProps/RenderProps.jsx";
import HigherOrderComponent from "./HigherOrderComponents/HigherOrderComponent.jsx";

// Advanced Patterns
import PropsCombination from "./PropsCombination/PropsCombination.jsx";
import PropsGetter from "./PropsGetter/PropsGetter.jsx";
import DependencyInjection from "./DependencyInjection/DependencyInjection.jsx";

// Export all patterns
export {
    // Structural Patterns
    AtomicComponents,
    ComponentComposition,
    CompoundComponent,
    StatefulAndStatelessComponent,
    
    // Behavioral Patterns
    ControlledProps,
    StateReducer,
    CustomHook,
    ProviderPattern,
    
    // Compositional Patterns
    ComponentInjection,
    RenderProps,
    HigherOrderComponent,
    
    // Advanced Patterns
    PropsCombination,
    PropsGetter,
    DependencyInjection
};

// Default export for convenience
export default {
    AtomicComponents,
    ComponentComposition,
    CompoundComponent,
    StatefulAndStatelessComponent,
    ControlledProps,
    StateReducer,
    CustomHook,
    ProviderPattern,
    ComponentInjection,
    RenderProps,
    HigherOrderComponent,
    PropsCombination,
    PropsGetter,
    DependencyInjection
};