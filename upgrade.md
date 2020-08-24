# Upgrade Guide

This upgrade guide will help you keep up with Form-js development.

## 0.3.0

### **High Impact Changes**
**Estimated Upgrade Time: 1 Minute**

`Errors.js`
- `get()` method will now return all messages for specific error field.  If you use an earlier version then you must use `getFirst()` instead.
