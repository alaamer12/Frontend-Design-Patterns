/**
 * Frontend Design Patterns - Central Export File
 * 
 * This file exports all 25 React design patterns for easy importing.
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

// Performance Patterns
import LazyLoading from "./LazyLoading/LazyLoading.jsx";
import PortalPattern from "./PortalPattern/PortalPattern.jsx";

// Classic Patterns
import ObserverPattern from "./ObserverPattern/ObserverPattern.jsx";
import SingletonPattern from "./SingletonPattern/SingletonPattern.jsx";
import FactoryPattern from "./FactoryPattern/FactoryPattern.jsx";
import StrategyPattern from "./StrategyPattern/StrategyPattern.jsx";
import ProxyPattern from "./ProxyPattern/ProxyPattern.jsx";
import ModulePattern from "./ModulePattern/ModulePattern.jsx";

// Architecture Patterns
import FluxPattern from "./FluxPattern/FluxPattern.jsx";
import LayoutPattern from "./LayoutPattern/LayoutPattern.jsx";
import ExtensibleStyles from "./ExtensibleStyles/ExtensibleStyles.jsx";

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
    DependencyInjection,
    
    // Performance Patterns
    LazyLoading,
    PortalPattern,
    
    // Classic Patterns
    ObserverPattern,
    SingletonPattern,
    FactoryPattern,
    StrategyPattern,
    ProxyPattern,
    ModulePattern,
    
    // Architecture Patterns
    FluxPattern,
    LayoutPattern,
    ExtensibleStyles
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
    DependencyInjection,
    LazyLoading,
    PortalPattern,
    ObserverPattern,
    SingletonPattern,
    FactoryPattern,
    StrategyPattern,
    ProxyPattern,
    ModulePattern,
    FluxPattern,
    LayoutPattern,
    ExtensibleStyles
};