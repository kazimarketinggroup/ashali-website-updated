import { NextRequest, NextResponse } from "next/server";
import { getCmsDataAsync, saveCmsData } from "@/src/utils/cmsStorage";
import { CMSData } from "@/src/types/cms";
import { defaultCmsData } from "@/src/data/defaultCmsData";

export async function GET() {
  try {
    const data = await getCmsDataAsync();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET /api/cms error:", error);
    return NextResponse.json({ success: false, error: "Failed to load CMS data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;
    const currentData = await getCmsDataAsync();
    const dataRecord = currentData as unknown as Record<string, unknown>;

    switch (action) {
      case "update_section": {
        const { section, data } = payload;
        if (!section || !data) {
          return NextResponse.json({ success: false, error: "Section and data required" }, { status: 400 });
        }
        dataRecord[section] = data;
        await saveCmsData(currentData);
        return NextResponse.json({ success: true, message: `Updated section ${section}`, data: currentData });
      }

      case "save_item": {
        const { collection, item } = payload;
        if (!collection || !item) {
          return NextResponse.json({ success: false, error: "Collection and item required" }, { status: 400 });
        }

        const items = (dataRecord[collection] as Array<{ id: string }>) || [];
        const existingIndex = items.findIndex((i) => i.id === item.id);

        if (existingIndex >= 0) {
          items[existingIndex] = { ...items[existingIndex], ...item };
        } else {
          // New item: assign ID if not provided
          if (!item.id) {
            item.id = `${collection.slice(0, 3)}-${Date.now()}`;
          }
          items.unshift(item);
        }

        dataRecord[collection] = items;
        await saveCmsData(currentData);
        return NextResponse.json({ success: true, message: "Item saved successfully", data: currentData });
      }

      case "delete_item": {
        const { collection, id } = payload;
        if (!collection || !id) {
          return NextResponse.json({ success: false, error: "Collection and id required" }, { status: 400 });
        }

        const items = (dataRecord[collection] as Array<{ id: string }>) || [];
        dataRecord[collection] = items.filter((i) => i.id !== id);
        await saveCmsData(currentData);
        return NextResponse.json({ success: true, message: "Item deleted successfully", data: currentData });
      }

      case "toggle_item": {
        const { collection, id, field = "published" } = payload;
        const items = (dataRecord[collection] as Array<Record<string, unknown>>) || [];
        const target = items.find((i) => i.id === id);
        if (target) {
          target[field] = !target[field];
          await saveCmsData(currentData);
        }
        return NextResponse.json({ success: true, message: "Item status toggled", data: currentData });
      }

      case "update_inquiry_status": {
        const { id, status, notes } = payload;
        const inquiry = currentData.inquiries.find((i) => i.id === id);
        if (inquiry) {
          inquiry.status = status;
          if (notes !== undefined) inquiry.notes = notes;
          await saveCmsData(currentData);
        }
        return NextResponse.json({ success: true, message: "Inquiry status updated", data: currentData });
      }

      case "delete_inquiry": {
        const { id } = payload;
        currentData.inquiries = currentData.inquiries.filter((i) => i.id !== id);
        await saveCmsData(currentData);
        return NextResponse.json({ success: true, message: "Inquiry deleted", data: currentData });
      }

      case "delete_subscriber": {
        const { id } = payload;
        currentData.subscribers = currentData.subscribers.filter((s) => s.id !== id);
        await saveCmsData(currentData);
        return NextResponse.json({ success: true, message: "Subscriber removed", data: currentData });
      }

      case "reset_defaults": {
        await saveCmsData(defaultCmsData);
        return NextResponse.json({ success: true, message: "Reset to default content", data: defaultCmsData });
      }

      case "import_backup": {
        const importedData = payload as CMSData;
        if (!importedData || !importedData.hero || !importedData.updates) {
          return NextResponse.json({ success: false, error: "Invalid backup format" }, { status: 400 });
        }
        await saveCmsData(importedData);
        return NextResponse.json({ success: true, message: "Backup successfully restored", data: importedData });
      }

      default:
        return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("POST /api/cms error:", error);
    return NextResponse.json({ success: false, error: "Failed to update CMS" }, { status: 500 });
  }
}
